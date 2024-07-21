export default function DeleteConfirmationModal({
    deleteFunction,
}: {
    deleteFunction: () => void;
}) {
    return (
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center !w-1/4">
                <h3 className="font-bold text-lg font-custom">
                    Delete All Subjects
                </h3>
                <p className="py-0">
                    Are you sure you want to delete all subjects?
                </p>
                <div className="mt-4">
                    <form
                        method="dialog"
                        className="flex gap-2 w-full mx-auto font-semibold"
                    >
                        {/* if there is a button in form, it will close the modal */}
                        <button className="border border-neutral-950 text-neutral-950 rounded-md hover:bg-neutral-950 hover:text-white duration-300 w-1/2 p-2">
                            Cancel
                        </button>
                        <button
                            className="border border-red-500 p-2 text-red-500 rounded-md hover:bg-red-600 hover:text-white duration-300 w-1/2"
                            onClick={deleteFunction}
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
