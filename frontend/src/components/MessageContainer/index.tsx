import { Bounce, ToastContainer } from "react-toastify";

type MessagesContainerProps = {
  children: React.ReactNode;
};

export function MessagesContainer({ children }: MessagesContainerProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        aria-label={""}
        limit={1}
        stacked={true}
      ></ToastContainer>
    </>
  );
}
