import { Box } from "@chakra-ui/react"
import { useRef, useEffect } from "react";
import type * as store from "../../types/store"
import { User, Stranger } from "./component/chatlist"
import { useAppSelector } from "../../src/store/hook";

const Chat = () => {

    const getDateStringServ = (timestamp: number) => {
        const plus0 = (num: any) => `0${num.toString()}`.slice(-2),
            d = new Date(timestamp), year = d.getFullYear(),
            monthTmp = d.getMonth() + 1, month = plus0(monthTmp),
            date = plus0(d.getDate()), hour = plus0(d.getHours()),
            minute = plus0(d.getMinutes()), second = plus0(d.getSeconds()),
            rest = timestamp.toString().slice(-5)
        return `${year}-${month}-${date} , ${hour}:${minute}:${second}`
    }

    const messageEl = useRef<null | any>(null);
    const state = useAppSelector(state => state)

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', (event: any) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const Messages = state?.room?.chat?.map((value: store.chat, index: number) => {
        if (value?.sender?.email == state?.user?.email) { return <User key={index} value={value} index={index} dateToString={getDateStringServ} /> }
        else { return <Stranger key={index} value={value} index={index} dateToString={getDateStringServ} /> }
    })


    return (
        <>
            < Box overflowY={"scroll"} ref={messageEl} >
                <Box p="1rem">
                    {Messages}
                </Box>
            </Box>
        </>

    )
}

export default Chat
