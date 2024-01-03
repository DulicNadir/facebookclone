import PropagateLoader from 'react-spinners/PropagateLoader';
import './styles.css';
const ActivateForm = ({ type, header, text, loading }) => {
  return (
    <div className='blur'>
      <div className='popup'>
        <div
          className={`popupHeader ${
            type === 'success' ? 'successText' : 'errorText'
          }`}>
          {header}
        </div>
        <div className='popupMessage'>{text}</div>
        <PropagateLoader color='#1876f2' loading={loading} size={30} />
      </div>
    </div>
  );
};

export default ActivateForm;
