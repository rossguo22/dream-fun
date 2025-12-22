import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DreamsProvider } from './context/DreamsContext';
import Layout from './components/Layout';
import DreamFeed from './pages/DreamFeed';
import DreamDetail from './pages/DreamDetail';
import Create from './pages/Create';
import Profile from './pages/Profile';

function App() {
  return (
    <DreamsProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DreamFeed />} />
            <Route path="/dream/:id" element={<DreamDetail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DreamsProvider>
  );
}

export default App;

