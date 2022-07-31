import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import FlipkartAdmin from "./components/FlipkartAdmin"
import CompanyAdmin from './components/CompanyAdmin';
import Client from './components/Client';
import Lost from './components/Lost';
import WalletState from "./context/walletState/WalletState";
import ContractState from "./context/contractData/ContractState";
import Marketplace from "./components/Marketplace";
import ContractAddressMapping from "./components/ContractAddressMapping";

function App() {
  return (
    <div className="select-none">
    <ContractState>
    <WalletState>
      <Router>
        <Routes>
          <Route path="/" element={<><Home /></>} />
          <Route exact path="admin/flipkart" element={<><FlipkartAdmin /></>} />
          <Route exact path="admin/company" element={<><CompanyAdmin /></>} />
          <Route exact path="client/nfts" element={<><Client /></>} />
          <Route path="client/marketplace" element={<><Marketplace /></>} />
          <Route path="contracts/address-mapping" element={<><ContractAddressMapping /></>} />
          <Route path="*" element={<><Lost /></>} />
        </Routes>
      </Router>
    </WalletState>
    </ContractState>
    </div>
  );
}

export default App;
