import { Link, Outlet } from "react-router-dom"
import styles from './rootLayout.module.scss'

function NavBar() {
    return <>
        <Link to="/Home" className={styles.navCommon}>Home</Link>
        <Link to="/Pricing" className={styles.navCommon}>Pricing</Link>
        <Link to="/Subscription" className={styles.navCommon}>Subscription</Link>
        <Link to="/Executed" className={styles.navCommon}>Executed</Link>
        <Link to="/Maintenance" className={styles.navCommon}>Maintenance</Link>
    </>
}

function RootLayout() {
    return <>
        <header>
            <NavBar></NavBar>
        </header>
        <body className={styles.rootContainer}>
            <Outlet></Outlet>
        </body>
    </>
}

export default RootLayout