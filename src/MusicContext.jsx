import  { createContext, useState, useEffect, useRef } from 'react';
import musicData from "./assets/mydb.json";

const audioFiles = import.meta.glob('./assets/music/*.mp3', { eager: true });

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [musics, setMusics] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setMusics(musicData);
    if (musicData.length > 0) {
      setCurrentMusic(musicData[0]);
    }
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      playNextTrack();
    };
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleLoadedMetadata = () => setDuration(audioElement.duration);

    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentMusic]);

  const handleMusicSelect = async (music) => {
    setCurrentMusic(music);
    if (audioRef.current) {
      try {
        const audioPath = `./assets/music/${music.file}`;
        if (audioFiles[audioPath]) {
          audioRef.current.src = audioFiles[audioPath].default;
          await audioRef.current.load();
          await audioRef.current.play();
        } else {
          console.error("Audio file not found:", audioPath);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Error toggling audio:", error);
      }
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const playNextTrack = () => {
    const currentIndex = musics.findIndex(music => music.id === currentMusic.id);
    const nextIndex = (currentIndex + 1) % musics.length;
    handleMusicSelect(musics[nextIndex]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <MusicContext.Provider
      value={{
        musics,
        currentMusic,
        isPlaying,
        currentTime,
        duration,
        audioRef,
        handleMusicSelect,
        togglePlay,
        handleSeek,
        formatTime,
      }}
    >
      {children}
      <audio ref={audioRef} className="hidden" />
    </MusicContext.Provider>
  );
};