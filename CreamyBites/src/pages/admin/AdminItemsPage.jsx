import Base from "../../components/base";
import Items from "../../components/Items";
import NavBar from "../../components/NavBar";

const AdminItemsPage = () =>{
    return(
        <>
        <NavBar/>
        <Base>
        <Items isAdmin={true}/>
        </Base>
        </>
    );
}

export default AdminItemsPage;