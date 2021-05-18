import {Modal, notification} from 'antd';

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

type SuccessResponse = {
  error: false;
  medal: string;
};

type ErrorResponse = {
  error: true;
  message: string;
};

type Response = SuccessResponse | ErrorResponse;

const participateInOlympics = (verbose?: boolean): Response => {
  let success;
  let error;

  if (verbose) {
    ({success, error} = notification);
  } else {
    success = () => {};
    error = () => {};
  }

  try {
    getGold();
  } catch (err) {
    error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      getSilver();
    } catch (err) {
      error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        getBronze();
      } catch (err) {
        error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }

      success({message: 'Got bronze'});
      return {error: false, medal: 'bronze'};
    }

    success({message: 'Got silver'});
    return {error: false, medal: 'silver'};
  }

  success({message: 'Got gold'});

  try {
    getPlatinum();
  } catch (err) {
    error({
      message: 'Failed to get platinum',
      description: err.message,
    });

    return {error: false, medal: 'gold'};
  }

  success({message: 'Got platinum'});

  try {
    getAdamantium();
  } catch (err) {
    error({
      message: 'Failed to get adamantium',
      description: err.message,
    });

    return {error: false, medal: 'platinum'};
  }

  success({message: 'Got adamantium'});
  return {error: false, medal: 'adamantium'};
};

const participateInOlympics2 = (verbose?: boolean): Response => {
  let success;
  let error;

  if (verbose) {
    ({success, error} = notification);
  } else {
    success = () => {};
    error = () => {};
  }

  try {
    getGold();
    success({message: 'Got gold'});

    try {
      getPlatinum();
      success({message: 'Got platinum'});

      try {
        getAdamantium();
        success({message: 'Got adamantium'});
        return {error: false, medal: 'adamantium'};
      } catch (err) {
        error({
          message: 'Failed to get adamantium',
          description: err.message,
        });

        return {error: false, medal: 'platinum'};
      }
    } catch (err) {
      error({
        message: 'Failed to get platinum',
        description: err.message,
      });

      return {error: false, medal: 'gold'};
    }
  } catch (err) {
    error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      getSilver();
      success({message: 'Got silver'});
      return {error: false, medal: 'silver'};
    } catch (err) {
      error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        getBronze();
        success({message: 'Got bronze'});
        return {error: false, medal: 'bronze'};
      } catch (err) {
        error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }
    }
  }
};

const res = participateInOlympics(true);

if (res.error) {
  Modal.error({title: res.message});
} else {
  Modal.success({title: `Congratulations with winning the ${res.medal}!`});
}

const App = () => <>Hello</>;
export default App;
