import { BottomNavigation, BottomNavigationAction} from "@mui/material";
import { Link } from 'react-router-dom';
import Akun from './Akun.svg';
import Beranda from './Beranda.svg';
import Barcode from './Barcode.svg';
import Riwayat from './Riwayat.svg';
import Logout from './Logout.svg';
const Footer = () => {
    return(
        <BottomNavigation
            // showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            >
            {/* <Link to="">
                <img src={Beranda} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Riwayat} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Barcode} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Akun} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link>
            <Link to="">
                <img src={Logout} alt="Daftarkan-toko" className="investor-card-menu" />
            </Link> */}

        </BottomNavigation>
    );
};

export default Footer;
