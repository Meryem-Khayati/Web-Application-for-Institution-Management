import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminRoutes from './pages/Admin/AdminRoutes';
import PublicRoutes from './pages/partiePublic/PublicRoutes';
import AuthGarde from './pages/helpers/AuthGarde';
import AuthGardeEtudiant from './pages/helpers/AuthGardeEtudiant';
import LoginRoutes from './pages/auth/LoginRoutes';
import EtudiantRoutes from './pages/Etudiant/EtudiantRoutes'
import './App.css'




function App() {
  return (
    <div>
   
      <BrowserRouter>
          <Routes>
             <Route path='/*' element={<PublicRoutes />}/>
             <Route path='/dashboard/*' element={
              <AuthGarde>
                 <AdminRoutes />
              </AuthGarde>
             }/>
             <Route path='/etudiant/*' element={
              <AuthGardeEtudiant>
                 <EtudiantRoutes />
              </AuthGardeEtudiant>
             }/>
             <Route path='/auth/*' element={<LoginRoutes />}/>
          </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
