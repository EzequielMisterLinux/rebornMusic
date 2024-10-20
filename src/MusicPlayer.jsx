import { useContext } from 'react';
import { MusicContext } from './MusicContext';

const imageFiles = import.meta.glob('./assets/images/*', { eager: true });

const MusicPlayer = () => {
  const {
    currentMusic,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    handleSeek,
    formatTime,
  } = useContext(MusicContext);

  const getImageUrl = (imageName) => {
    const imagePath = `./assets/images/${imageName}`;
    return imageFiles[imagePath]?.default;
  };

  if (!currentMusic) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm p-4 flex items-center justify-between shadow-2xl z-50">
      <div className="flex items-center space-x-4">
        {getImageUrl(currentMusic.image) ? (
          <img
            src={getImageUrl(currentMusic.image)}
            alt={currentMusic.title}
            className="w-12 h-12 object-cover rounded-full shadow-md"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-400">No image</span>
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-indigo-300">{currentMusic.title}</h3>
          <p className="text-sm text-gray-400">{currentMusic.artist}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center mx-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 mb-2 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer"
          />
        </div>
        <div className="flex justify-between w-full mt-1 text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;