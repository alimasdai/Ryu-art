import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";


export default function Content() {
    return (
        <div className="w-full overflow-hidden h-auto">
            <Routes>
                <Route path="/" element={<Home/>}/> 
            </Routes>
        </div>
    )
}