import { useContext } from "react";
import Header from "../components/elements/Header";
import Footer from "../components/elements/Footer";
import { MusicContext } from "../MusicContext";

const imageFiles = import.meta.glob('../assets/images/*', { eager: true });

const HomeClient = () => {
  const { musics, currentMusic, handleMusicSelect } = useContext(MusicContext);

  const getImageUrl = (imageName) => {
    const imagePath = `../assets/images/${imageName}`;
    return imageFiles[imagePath]?.default;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {musics.map((music) => {
            const imageUrl = getImageUrl(music.image);

            return (
              <div
                key={music.id}
                className={`bg-gray-800 p-5 rounded-xl shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50 ${currentMusic?.id === music.id ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900" : ""}`}
                onClick={() => handleMusicSelect(music)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={music.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Image not found</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-indigo-300">{music.title}</h2>
                <p className="text-sm text-gray-300 mt-2">Artist: {music.artist}</p>
                <p className="text-sm text-gray-400">Genre: {music.genre}</p>
                <p className="text-lg font-semibold text-indigo-400 mt-2">release: {music.releaseDate}</p>
                <p className="text-lg font-semibold text-indigo-400 mt-2">{"free"}</p>
              </div>
            );
          })}
        </div>
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        </div>
      </main>
      
    </div>
  );
};

export default HomeClient;