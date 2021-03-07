import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

const ExportFunction = () => useContext(AuthContext);

export default ExportFunction;