import { AsbPlayerToVideoCommandV2, ExtensionToAsbPlayerCommandTabsCommand, Message, VideoTabModel } from '@project/common';
import { v4 as uuidv4 } from 'uuid';

export interface ExtensionMessage {
    data: Message;
    tabId: number;
    src: string;
}

export default class ChromeExtension {
    tabs: VideoTabModel[];

    private readonly onMessageCallbacks: Array<(message: ExtensionMessage) => void>;
    private readonly onTabsCallbacks: Array<(tabs: VideoTabModel[]) => void>;
    private readonly versionPromise: Promise<string>;
    private readonly id: string;

    private versionResolve?: (value: string | PromiseLike<string>) => void;
    private heartbeatStarted = false;

    constructor() {
        this.onMessageCallbacks = [];
        this.onTabsCallbacks = [];
        this.tabs = [];
        this.versionPromise = new Promise((resolve, reject) => {
            this.versionResolve = resolve;
        });
        this.id = uuidv4();

        window.addEventListener('message', (event) => {
            if (event.source !== window) {
                return;
            }

            if (event.data.sender === 'asbplayer-extension-to-player') {
                if (event.data.message) {
                    if (event.data.message.command === 'tabs') {
                        const tabsCommand = event.data as ExtensionToAsbPlayerCommandTabsCommand;
                        this.tabs = tabsCommand.message.tabs;

                        for (let c of this.onTabsCallbacks) {
                            c(this.tabs);
                        }

                        if (tabsCommand.message.ackRequested) {
                            window.postMessage(
                                {
                                    sender: 'asbplayerv2',
                                    message: {
                                        command: 'ackTabs',
                                        id: this.id,
                                        receivedTabs: this.tabs,
                                    },
                                },
                                '*'
                            );
                        }

                        return;
                    }

                    if (event.data.message.command === 'version') {
                        this.versionResolve!(event.data.message.version);
                        return;
                    }

                    for (let c of this.onMessageCallbacks) {
                        c({
                            data: event.data.message,
                            tabId: event.data.tabId,
                            src: event.data.src,
                        });
                    }
                }
            }
        });
    }

    startHeartbeat() {
        if (!this.heartbeatStarted) {
            this._sendHeartbeat();
            setInterval(() => this._sendHeartbeat(), 1000);
            this.heartbeatStarted = true;
        }
    }

    _sendHeartbeat() {
        window.postMessage(
            {
                sender: 'asbplayerv2',
                message: {
                    command: 'heartbeat',
                    id: this.id,
                    receivedTabs: this.tabs,
                },
            },
            '*'
        );
    }

    async installedVersion(): Promise<string> {
        return await this.versionPromise;
    }

    sendMessage(message: Message, tabId: number, src: string) {
        const command: AsbPlayerToVideoCommandV2<Message> = {
            sender: 'asbplayerv2',
            message: message,
            tabId: tabId,
            src: src,
        };
        window.postMessage(command, '*');
    }

    publishMessage(message: Message) {
        for (const tab of this.tabs) {
            const command: AsbPlayerToVideoCommandV2<Message> = {
                sender: 'asbplayerv2',
                message: message,
                tabId: tab.id,
                src: tab.src,
            };
            window.postMessage(command, '*');
        }
    }

    subscribeTabs(callback: (tabs: VideoTabModel[]) => void) {
        this.onTabsCallbacks.push(callback);
    }

    unsubscribeTabs(callback: (tabs: VideoTabModel[]) => void) {
        this._remove(callback, this.onTabsCallbacks);
    }

    subscribe(callback: (message: ExtensionMessage) => void) {
        this.onMessageCallbacks.push(callback);
    }

    unsubscribe(callback: (message: ExtensionMessage) => void) {
        this._remove(callback, this.onMessageCallbacks);
    }

    _remove(callback: Function, callbacks: Function[]) {
        for (let i = callbacks.length - 1; i >= 0; --i) {
            if (callback === callbacks[i]) {
                callbacks.splice(i, 1);
                break;
            }
        }
    }
}