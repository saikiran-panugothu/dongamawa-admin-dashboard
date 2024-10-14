import './Loader.css'; // Assuming you put your CSS in a separate file

export const Loader = () => {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};
