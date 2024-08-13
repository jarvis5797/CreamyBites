import Base from "../../components/base";
import Items from "../../components/Items";
import NavBar from "../../components/NavBar";

const UserItemPage=()=>{
    return(
        <>
        <NavBar isAdmin={false}/>
        <Base>
        <Items isAdmin={false}/>
        </Base>
        </>
    );
}

export default UserItemPage;