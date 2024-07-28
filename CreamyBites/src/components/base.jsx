import "../css/base.css"

const Base = ({children}) => {
    return(
        <div className="min-h-screen flex flex-col bg-gray-100 Base">
      <main className="flex-grow">
        {children}
      </main>
    </div>
    );

}

export default Base;