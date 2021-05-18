import {notification} from 'antd';

const mayThrowFactory = (msg: string) => () => {
  if (Math.random() < 0.5) {
    throw new Error(msg);
  }
};

const getAdamantium = mayThrowFactory('Adamantium was taken by someone else');
const getPlatinum = mayThrowFactory('Platinum was taken by someone else');
const getGold = mayThrowFactory('Gold was taken by someone else');
const getSilver = mayThrowFactory('Silver was taken by someone else');
const getBronze = mayThrowFactory('Bronze was taken by someone else');

const example = () => {
  try {
    getGold();
  } catch (err) {
    notification.error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      getSilver();
    } catch (err) {
      notification.error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        getBronze();
      } catch (err) {
        notification.error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }

      notification.success({message: 'Got bronze'});
      return {error: false, medal: 'bronze'};
    }

    notification.success({message: 'Got silver'});
    return {error: false, medal: 'silver'};
  }

  notification.success({message: 'Got gold'});

  try {
    getPlatinum();
  } catch (err) {
    notification.error({
      message: 'Failed to get platinum',
      description: err.message,
    });

    return {error: false, medal: 'gold'};
  }

  notification.success({message: 'Got platinum'});

  try {
    getAdamantium();
  } catch (err) {
    notification.error({
      message: 'Failed to get adamantium',
      description: err.message,
    });

    return {error: false, medal: 'platinum'};
  }

  notification.success({message: 'Got adamantium'});
  return {error: false, medal: 'adamantium'};
};

const example2 = () => {
  try {
    getGold();
    notification.success({message: 'Got gold'});

    try {
      getPlatinum();
      notification.success({message: 'Got platinum'});

      try {
        getAdamantium();
        notification.success({message: 'Got adamantium'});
        return {error: false, medal: 'adamantium'};
      } catch (err) {
        notification.error({
          message: 'Failed to get adamantium',
          description: err.message,
        });

        return {error: false, medal: 'platinum'};
      }
    } catch (err) {
      notification.error({
        message: 'Failed to get platinum',
        description: err.message,
      });

      return {error: false, medal: 'gold'};
    }
  } catch (err) {
    notification.error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      getSilver();
      notification.success({message: 'Got silver'});
      return {error: false, medal: 'silver'};
    } catch (err) {
      notification.error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        getBronze();
        notification.success({message: 'Got bronze'});
        return {error: false, medal: 'bronze'};
      } catch (err) {
        notification.error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }
    }
  }
};

example();

const App = () => <>Hello</>;
export default App;
