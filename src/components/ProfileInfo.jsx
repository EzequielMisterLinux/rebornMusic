import  { useContext } from "react";
import Header from "../components/elements/Header";
import { MusicContext } from "../MusicContext";

const imageFiles = import.meta.glob('../assets/images/*', { eager: true });

const ProfileInfo = () => {
  const { musics, currentMusic, handleMusicSelect } = useContext(MusicContext);
  
  const getImageUrl = (imageName) => {
    const imagePath = `../assets/images/${imageName}`;
    return imageFiles[imagePath]?.default;
  };

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Humberto Ezequiel Zelaya Campos
          </h1>

          <section className="flex flex-col items-center mb-8">
            <img
              src={getImageUrl('profile.png')} // Asegúrate de tener una imagen llamada 'profile.jpg' en tu carpeta de imágenes
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full shadow-lg"
            />
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">About Me</h2>
            <p className="text-gray-300 mb-4">
              I am a passionate and versatile professional with expertise in full stack development, Android app creation, and system administration. With a strong foundation in multiple technologies, I strive to create efficient and user-friendly solutions.
            </p>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Skills</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Full Stack Development (React, Node.js, Express, MongoDB)</li>
              <li>Android Development (Java, Kotlin)</li>
              <li>System Administration (Linux, Windows Server)</li>
              <li>Cloud Services (AWS, Google Cloud)</li>
              <li>DevOps (Docker, Kubernetes, CI/CD)</li>
            </ul>
          </section>



          <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">My Favorite Music</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {musics.slice(4, 10).map((music) => (
                <div
                  key={music.id}
                  className={`bg-gray-700 p-4 rounded-lg cursor-pointer ${
                    currentMusic?.id === music.id ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onClick={() => handleMusicSelect(music)}
                >
                  {getImageUrl(music.image) && (
                    <img
                      src={getImageUrl(music.image)}
                      alt={music.title}
                      className="w-16 h-16 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-indigo-200">{music.title}</h3>
                  <p className="text-gray-400">{music.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>


        </div>
      </main>
    </>
  );
};

export default ProfileInfo;