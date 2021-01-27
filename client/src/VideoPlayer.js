import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Clock from './Clock';
import Controls from './Controls';
import PlayerChannel from './PlayerChannel';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        width: '100%',
        height: '100vh'
    },
    video: {
        objectFit: "cover",
        position: "absolute",
        width: "auto",
        height: "100%"
    }
});

export default function VideoPlayer(props) {
    const classes = useStyles();
    const { videoFile, channel } = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            videoFile: params.get('video'),
            channel: params.get('channel')
        };
    }, []);
    const [playing, setPlaying] = useState(false);
    const [length, setLength] = useState(0);
    const clock = useMemo(() => new Clock(), []);
    const mousePositionRef = useRef({x:0, y:0});
    const playerChannelRef = useRef(new PlayerChannel(channel));
    const videoRef = useRef(null);
    const videoRefCallback = useCallback(element => {
        if (element) {
            videoRef.current = element;

            if (element.duration) {
                playerChannelRef.current.ready(element.duration);
            } else {
                element.onloadeddata = (event) => {
                    // https://stackoverflow.com/questions/10385768/how-do-you-resize-a-browser-window-so-that-the-inner-width-is-a-specific-value
                    if (window.outerWidth) {
                        const desiredWidth = element.videoWidth + (window.outerWidth - window.innerWidth);
                        const desiredHeight = element.videoHeight + (window.outerHeight - window.innerHeight);
                        const resizeRatio = Math.max(1, Math.min(window.screen.width / desiredWidth, window.screen.height / desiredHeight));

                        window.resizeTo(
                            resizeRatio * desiredWidth,
                            resizeRatio * desiredHeight
                        );
                    }

                    playerChannelRef.current.ready(element.duration);
                };
            }
        }
    }, []);

    useEffect(() => {
        playerChannelRef.current.onReady((duration) => {
            setLength(duration);
        });
        playerChannelRef.current.onPlay(() => {
            videoRef.current.play();
            clock.start();
            setPlaying(true);
        });
        playerChannelRef.current.onPause(() => {
            videoRef.current.pause();
            clock.stop();
            setPlaying(false);
        });
        playerChannelRef.current.onCurrentTime((currentTime) => {
            console.log("currentTime=" + currentTime);
            videoRef.current.currentTime = currentTime;
            clock.setTime(currentTime * 1000);
        });
        playerChannelRef.current.onClose(() => {
            playerChannelRef.current.close();
            playerChannelRef.current = null;
            window.close();
        });

        return () => {
            if (playerChannelRef.current) {
                playerChannelRef.current.close();
            }
        }
    }, [clock, setPlaying]);

    const handlePlay = useCallback(() => {
        if (playerChannelRef.current) {
            console.log('play');
            playerChannelRef.current.play();
        }
    }, []);

    const handlePause = useCallback(() => {
        if (playerChannelRef.current) {
            playerChannelRef.current.pause();
        }
    }, []);

    const handleSeek = useCallback((progress) => {
        if (playerChannelRef.current) {
            const time = progress * length;
            playerChannelRef.current.currentTime = time / 1000;
        }
    }, [length]);

    function handleMouseMove(e) {
        mousePositionRef.current.x = e.screenX;
        mousePositionRef.current.y = e.screenY;
    };

    return (
        <div onMouseMove={handleMouseMove} className={classes.root}>
            <video
                nocontrols={1}
                className={classes.video}
                ref={videoRefCallback}
                src={props.api.streamingUrl(videoFile)} />
            <Controls
                mousePositionRef={mousePositionRef}
                playing={playing}
                clock={clock}
                length={length}
                onPlay={handlePlay}
                onPause={handlePause}
                onSeek={handleSeek} />
        </div>
    );
}