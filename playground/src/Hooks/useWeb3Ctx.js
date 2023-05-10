import { useContext } from "react"
import Web3Ctx from "../components/Web3Manager/Web3Ctx";

export default function useWeb3Ctx() {
    const context = useContext(Web3Ctx);
    return context
}