import styles from './sync.css';

const sync = () => {
    console.log('start');
    fetch('/api/test')
        .then(res => res.json())
        .then(data => {
            console.log('get Data');
        })
        .catch(err => {
            console.log('🍎🍌吃了');
            // navigator.sendBeacon('http://a.com/a.git?error='+err);
        });
        document.getElementById('app').innerHTML = `<div class=${styles.test}>Message</div>`;
}

export default sync;