import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeClient from "./HomeClient";
import ProfileInfo from "../components/ProfileInfo";
import { MusicProvider } from "../MusicContext";
import MusicPlayer from "../MusicPlayer";

const RoutePage = () => {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeClient />} />
          <Route path="/my-profile" element={<ProfileInfo />} />
        </Routes>
        <MusicPlayer />
      </Router>
    </MusicProvider>
  );
};

export default RoutePage;