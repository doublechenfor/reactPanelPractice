import { memo } from 'react'
import styles from './card.module.scss'

const Card = memo(function (props) {
    function prePage() {
        if (props.currentPage <= 1) {
            return;
        }
        props.prePageEvent(props.currentPage - 1, props.title)
    }
    function nextPage() {
        if (props.currentPage >= props.total) {
            return;
        }
        props.nextPageEvent(props.currentPage + 1, props.title)
    }

    return (
        <div className={styles.wrapperCard}>
            <div className={styles.header}>
                <p>{props.title}</p>
            </div>
            <div className={styles.body}>
                {props.children}
            </div>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    {props.currentPage} / {props.total}
                </div>
                <div className={styles.footerRight}>
                    <button onClick={prePage}>pre</button>
                    <button onClick={nextPage}>next</button>
                </div>
            </div>
        </div>
    )

})

export default Card