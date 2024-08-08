import { RPC } from "../constants";
import { Connection } from "@solana/web3.js";

export let connection = new Connection(RPC, "confirmed");
