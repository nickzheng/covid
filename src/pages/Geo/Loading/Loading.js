import PropTypes from 'prop-types';
import style from './Loading.less';

const Loading = ({ loading }) => loading && <div className={style.loading} />;

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
