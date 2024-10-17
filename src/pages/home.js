import { Link } from 'react-router-dom';
import CreateSupportModal from '~/components/createSupportModal';
import Header from '~/components/header';


function Home() {
    return (
      
            <div className="h-screen bg-[#F0F2F5]">
                <Header />
                <div className="pt-[50px]">
                    <Link to="/dashboard" className="bg-slate-200 ">
                        Go to dashboard
                    </Link>
                </div>
                <CreateSupportModal/>
            </div>
       
    );
}

export default Home;
