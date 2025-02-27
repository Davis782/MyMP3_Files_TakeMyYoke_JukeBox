function AudioPlayer({ audioFile, onTimeUpdate, isAutoplayEnabled, onSongEnd }) {
    try {
        const audioRef = React.useRef(null);

        React.useEffect(() => {
            if (audioRef.current) {
                audioRef.current.addEventListener('ended', onSongEnd);
                return () => {
                    audioRef.current.removeEventListener('ended', onSongEnd);
                };
            }
        }, [onSongEnd]);

        const handleSkip = (seconds) => {
            if (audioRef.current) {
                audioRef.current.currentTime += seconds;
            }
        };

        if (!audioFile) {
            return (
                <div className="audio-player" data-name="audio-player">
                    <p className="text-center text-gray-600">No audio file available</p>
                </div>
            );
        }

        return (
            <div className="audio-player" data-name="audio-player">
                <audio
                    ref={audioRef}
                    controls
                    src={audioFile}
                    autoPlay={isAutoplayEnabled}
                    onTimeUpdate={() => onTimeUpdate(audioRef.current?.currentTime || 0)}
                    data-name="audio-element"
                >
                    Your browser does not support the audio element.
                </audio>
                <div className="audio-controls" data-name="audio-controls">
                    <button
                        className="control-button"
                        onClick={() => handleSkip(-15)}
                        data-name="backward-button"
                    >
                        <i className="fas fa-backward"></i> -15s
                    </button>
                    <button
                        className="control-button"
                        onClick={() => handleSkip(15)}
                        data-name="forward-button"
                    >
                        <i className="fas fa-forward"></i> +15s
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AudioPlayer component error:', error);
        reportError(error);
        return null;
    }
}
