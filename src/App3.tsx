import {message} from 'antd';

const getAdamantium = () => {};
const getPlatinum = () => {};
const getGold = () => {};
const getSilver = () => {};
const getBronze = () => {};

const example = () => {
  try {
    getGold();
  } catch {
    message.error('Failed to get gold');

    try {
      getSilver();
    } catch {
      message.error('Failed to get silver');

      try {
        getBronze();
      } catch {
        message.error('Failed to get any medal');
        return {error: true, message: 'Failed to get any medal'};
      }

      message.success('Bronze has been won');
      return {error: false, medal: 'bronze'};
    }

    message.success('Silver has been won');
    return {error: false, medal: 'silver'};
  }

  message.success('Gold has been won');

  try {
    getPlatinum();
  } catch {
    message.error('Failed to get platinum');
    return {error: false, medal: 'gold'};
  }

  message.success('Platinum has been won');

  try {
    getAdamantium();
  } catch {
    message.error('Failed to get adamantium');
    return {error: false, medal: 'platinum'};
  }

  message.success('Adamantium has been won');
  return {error: false, medal: 'adamantium'};
};

const example2 = () => {
  try {
    getGold();
    message.success('Gold has been won');

    try {
      getPlatinum();
      message.success('Platinum has been won');

      try {
        getAdamantium();
        message.success('Adamantium has been won');
        return {error: false, medal: 'adamantium'};
      } catch {
        message.error('Failed to get adamantium');
        return {error: false, medal: 'platinum'};
      }
    } catch {
      message.error('Failed to get platinum');
      return {error: false, medal: 'gold'};
    }
  } catch {
    message.error('Failed to get gold');

    try {
      getSilver();
      message.success('Silver has been won');
      return {error: false, medal: 'silver'};
    } catch {
      message.error('Failed to get silver');

      try {
        getBronze();
        message.success('Bronze has been won');
        return {error: false, medal: 'bronze'};
      } catch {
        message.error('Failed to get any medal');
        return {error: true, message: 'Failed to get any medal'};
      }
    }
  }
};

const App = () => <>Hello123</>;
export default App;
