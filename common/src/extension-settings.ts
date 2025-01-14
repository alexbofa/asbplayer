export type SubtitleAlignment = 'top' | 'bottom';
export interface ExtensionKeyBindingsSettings {
    bindPlay: boolean;
    bindAutoPause: boolean;
    bindCondensedPlayback: boolean;
    bindToggleSubtitles: boolean;
    bindToggleSubtitleTrackInVideo: boolean;
    bindToggleSubtitleTrackInAsbplayer: boolean;
    bindSeekToSubtitle: boolean;
    bindAdjustOffsetToSubtitle: boolean;
    bindAdjustOffset: boolean;
    bindResetOffset: boolean;
    bindAdjustPlaybackRate: boolean;
    bindSeekBackwardOrForward: boolean;
    bindSeekToBeginningOfCurrentSubtitle: boolean;
}

export interface ExtensionSettings extends ExtensionKeyBindingsSettings {
    displaySubtitles: boolean;
    recordMedia: boolean;
    screenshot: boolean;
    cleanScreenshot: boolean;
    cropScreenshot: boolean;
    subsDragAndDrop: boolean;
    autoSync: boolean;
    // Last language selected in subtitle track selector, keyed by domain
    // Used to auto-selecting a language in subtitle track selector, if it's available
    lastLanguagesSynced: { [key: string]: string };
    subtitlePositionOffset: number;
    condensedPlaybackMinimumSkipIntervalMs: number;
    asbplayerUrl: string;
    lastThemeType: 'dark' | 'light';
    // Last language selected in asbplayer settings
    // Used for localization of asbplayer
    lastLanguage: string;
    imageDelay: number;
    subtitleAlignment: SubtitleAlignment;
}
