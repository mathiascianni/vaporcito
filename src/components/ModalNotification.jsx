import { AiOutlineClose } from "react-icons/ai";
const ModalNotification = ({ title, subtitle, icon, tBtnText, tBtnAction, fBtnText, fBtnAction, close, iColor }) => {
    return (
        <aside className="z-50 w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center text-dark">
            <div className="fixed top-0 left-0 bg-dark/50 w-screen h-screen backdrop-blur-md" onClick={close}></div>
            <div className="bg-white p-4 rounded-md w-[800px] max-w-[90%] flex flex-col justify-center items-center relative">
                <div className={`text-4xl flex items-center justify-center bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 border shadow-md ${iColor} transition`}>
                    {icon}
                </div>

                <div className="w-full"><button className="text-input/50 float-right" onClick={close} ><AiOutlineClose className="text-2xl" /></button></div>

                <div className="mt-8 w-full text-center flex flex-col gap-16">
                    <h2 className="text-2xl mb-4">{title}</h2>
                    <p className=" mb-4">{subtitle}</p>
                    <div className="w-full flex justify-between gap-2">
                        <button onClick={fBtnAction} className="border border-error w-full p-2 rounded-full hover:bg-error hover:text-white transition text-error">{fBtnText}</button>
                        <button onClick={tBtnAction} className="bg-primary text-white w-full p-2 rounded-full hover:bg-primary-dark transition">{tBtnText}</button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default ModalNotification;
