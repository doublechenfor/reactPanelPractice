import { useCallback, useEffect, useMemo, useState } from "react"
import styles from './home.module.scss'
import Card from '../components/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNoteDetailsFromCloud } from './action'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { NUM_PAGE } from './home.constant.ts'

function Home() {
    const [currentPricingData, setCurrentPricingData] = useState({
        currentPage: 1,
        data: [],
        total: 1
    })
    const [currentSubscriptionData, setCurrentSubscriptionData] = useState({
        currentPage: 1,
        data: [],
        total: 1
    })
    const [currentExecutedData, setCurrentExecutedData] = useState({
        currentPage: 1,
        data: [],
        total: 1
    })
    const [currentMaintenanceData, setCurrentMaintenanceData] = useState({
        currentPage: 1,
        data: [],
        total: 1
    })
    // eslint-disable-next-line
    const [allDataList, setAllDataList] = useState([])
    const [showModel, setShowModel] = useState(false);
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const queryclient = useQueryClient()

    const fetchData = useCallback(async () => {
        const res = await fetch('./static/home_data.json')
        if (res.ok) {
            const data = await res.json()
            return data.data
        }
    }, [])
    // let { data, isLoading } = useCus('userData')
    const { data, isLoading } = useQuery({ queryKey: ["userData"], queryFn: fetchData, refetchOnReconnect: true })
    const refreshdata = () => {
        queryclient.invalidateQueries({ queryKey: ["userData"] })
    }
    useEffect(() => {
        setAllDataList(data);
        if (!data) {
            return;
        }
        const pricing = data['pricing'].slice((currentPricingData.currentPage - 1) * NUM_PAGE, currentPricingData.currentPage * NUM_PAGE)
        const subscription = data['subscription'].slice((currentSubscriptionData.currentPage - 1) * NUM_PAGE, currentSubscriptionData.currentPage * NUM_PAGE)
        const executed = data['executed'].slice((currentExecutedData.currentPage - 1) * NUM_PAGE, currentExecutedData.currentPage * NUM_PAGE)
        const maintenance = data['maintenance'].slice((currentMaintenanceData.currentPage - 1) * NUM_PAGE, currentMaintenanceData.currentPage * NUM_PAGE)

        setCurrentPricingData({
            data: pricing,
            currentPage: currentPricingData.currentPage,
            total: Math.ceil(data['pricing'].length / NUM_PAGE)
        })
        setCurrentSubscriptionData({
            data: subscription,
            currentPage: currentSubscriptionData.currentPage,
            total: Math.ceil(data['subscription'].length / NUM_PAGE)
        })
        setCurrentExecutedData({
            data: executed,
            currentPage: currentExecutedData.currentPage,
            total: Math.ceil(data['executed'].length / NUM_PAGE)
        })
        setCurrentMaintenanceData({
            data: maintenance,
            currentPage: currentMaintenanceData.currentPage,
            total: Math.ceil(data['maintenance'].length / NUM_PAGE)
        })
    }, [data, currentExecutedData.currentPage,
        currentMaintenanceData.currentPage, currentPricingData.currentPage, currentSubscriptionData.currentPage, isLoading])

    const openModel = useCallback((item) => {
        setShowModel(true)
        dispatch(fetchNoteDetailsFromCloud())
    }, [setShowModel, dispatch])

    const setCurrentData = (page, title) => {
        switch (title) {
            case 'pricing':
                const pricing = data['pricing'].slice((page - 1) * NUM_PAGE, page * NUM_PAGE)
                setCurrentPricingData({
                    currentPage: page,
                    data: pricing
                })
                break;
            case 'subscription':
                const subscription = data['subscription'].slice((page - 1) * NUM_PAGE, page * NUM_PAGE)
                setCurrentSubscriptionData({
                    currentPage: page,
                    data: subscription
                })
                break;
            case 'executed':
                const executed = data['executed'].slice((page - 1) * NUM_PAGE, page * NUM_PAGE)
                setCurrentExecutedData({
                    currentPage: page,
                    data: executed
                })
                break;
            case 'maintenance':
                const maintenance = data['maintenance'].slice((page - 1) * NUM_PAGE, page * NUM_PAGE)
                setCurrentMaintenanceData({
                    currentPage: page,
                    data: maintenance
                })
                break;
            default:
                break;
        }
    }

    const prePageEvent = useCallback((page, title) => {
        setCurrentData(page, title?.toLowerCase())
        // eslint-disable-next-line
    }, [data])
    const nextPageEvent = useCallback((page, title) => {
        setCurrentData(page, title?.toLowerCase())
        // eslint-disable-next-line
    }, [data])

    const closeModal = () => {
        setShowModel(false)
    }

    const itemRenderComponent = useCallback(() => {
        return (
            <div className={styles.mask}>
                <div className={styles.wrapperPricingModel}>
                    <header className={styles.noteDetailsHeader}>
                        <span>Note Details</span>
                    </header>
                    <div className={styles.noteDetailsBody}>
                        {
                            state.noteDetails.loading ? <div>data is loading...</div> :
                                <>
                                    <span>{state.noteDetails.data.strikeDate}</span>
                                    <div>{state.noteDetails.data.tenor}</div>
                                </>
                        }
                    </div>
                    <footer className={styles.noteDetailsFooter}>
                        <span>Comfirm</span>
                        <span onClick={() => closeModal()}>Close</span>
                    </footer>
                </div>
            </div>

        )
    }, [state.noteDetails.loading, state.noteDetails.data.strikeDate, state.noteDetails.data.tenor])

    const subItemPricing = useMemo(() => {
        return (
            !!currentPricingData?.data?.length > 0 && currentPricingData?.data.map((item) => {
                return (
                    <div key={item.pr} className={styles.wrapperPricing} onClick={(item) => openModel(item)}>
                        <label htmlFor="pr" className={styles.wrapperPricingLabel}>PR</label>
                        <div id="pr">{item.pr}</div>
                    </div>
                )
            })
        )
    }, [currentPricingData, openModel])

    const subItemSubscription = useMemo(() => {
        return (
            !!currentSubscriptionData?.data?.length > 0 && currentSubscriptionData?.data.map((item) => {
                return (
                    <div key={item.pr} className={styles.wrapperPricing} onClick={(item) => openModel(item)}>
                        <label htmlFor="pr" className={styles.wrapperPricingLabel}>PR</label>
                        <div id="pr">{item.pr}</div>
                    </div>
                )
            })
        )
    }, [currentSubscriptionData, openModel])

    const subItemExecuted = useMemo(() => {
        return (
            !!currentExecutedData?.data?.length > 0 && currentExecutedData?.data.map((item) => {
                return (
                    <div key={item.pr} className={styles.wrapperPricing} onClick={(item) => openModel(item)}>
                        <label htmlFor="pr" className={styles.wrapperPricingLabel}>PR</label>
                        <div id="pr">{item.pr}</div>
                    </div>
                )
            })
        )
    }, [currentExecutedData, openModel])

    const subItemMaintenance = useMemo(() => {
        console.log('222', currentMaintenanceData)
        return (
            !!currentMaintenanceData?.data?.length > 0 && currentMaintenanceData?.data.map((item) => {
                return (
                    <div key={item.pr} className={styles.wrapperPricing} onClick={(item) => openModel(item)}>
                        <label htmlFor="pr" className={styles.wrapperPricingLabel}>PR</label>
                        <div id="pr">{item.pr}</div>
                    </div>
                )
            })
        )
    }, [currentMaintenanceData, openModel])
    return (
        <div className={styles.container}>
            <div onClick={refreshdata}>refresh</div>
            <div className={styles.containerCard}>
                <Card
                    title="Pricing"
                    data={currentPricingData?.data ?? []}
                    currentPage={currentPricingData.currentPage}
                    total={currentPricingData.total}
                    prePageEvent={prePageEvent}
                    nextPageEvent={nextPageEvent}
                >
                    {subItemPricing}
                </Card>
                <Card
                    title="Subscription"
                    data={currentSubscriptionData?.data ?? []}
                    currentPage={currentSubscriptionData.currentPage}
                    total={currentSubscriptionData.total}
                    prePageEvent={prePageEvent}
                    nextPageEvent={nextPageEvent}>
                    {subItemSubscription}
                </Card>
                <Card
                    title="Executed"
                    data={currentExecutedData?.data ?? []}
                    currentPage={currentExecutedData.currentPage}
                    total={currentExecutedData.total}
                    prePageEvent={prePageEvent}
                    nextPageEvent={nextPageEvent}>
                    {subItemExecuted}
                </Card>
                <Card
                    title="Maintenance"
                    data={currentMaintenanceData?.data ?? []}
                    currentPage={currentMaintenanceData.currentPage}
                    total={currentMaintenanceData.total}
                    prePageEvent={prePageEvent}
                    nextPageEvent={nextPageEvent}>
                    {subItemMaintenance}
                </Card>
            </div>
            {
                showModel ? itemRenderComponent() : <></>
            }
        </div>
    )


}

export default Home