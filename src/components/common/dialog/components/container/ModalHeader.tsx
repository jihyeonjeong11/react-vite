import { BiX } from 'react-icons/bi';
const ModalHeader = (
    {
        modalHeading,
        close
    }: {
        modalHeading: string;
        close: () => void;
    }
) => {
    return (
        <div className="flex items-center justify-between px-5">
            <h3 className="flex-1 py-4 text-center text-xl font-semibold">{modalHeading}</h3>
            <button 
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                aria-label={"close"}
                onClick={close}
            >
                <BiX size={24} />
            </button>
        </div>
    )
}
export default ModalHeader;