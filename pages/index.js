import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Contracts from "./contracts/index"

export default function Home({ allPostsData }) {
  return <><Contracts/></>;
}
