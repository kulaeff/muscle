import React from 'react'
import block from 'bem-cn'
import './style.less';

/**
 * About container
 * @class
 */
class About extends React.Component {
    /**
     * Settings properties
     * @static
     * @property {bool} useSmartFolding Use smart folding
     */
    static propTypes = {};

    /**
     * Invoked after the component was mounted
     * @method
     */
    componentDidMount() {
    }

    /**
     * Renders Settings container
     * @method
     */
    render() {
        const b = block('about');

        return (
            <div className={b()}>
                <div className={b('content')}>
                    <span className={b('title')}>Muscle</span>
                    <span className={b('description')}>An awesome MySQL manager</span>
                    <span className={b('version')}>
                        Version: {process.env.VERSION || 0}
                    </span>
                    <span className={b('url')}>
                        <a href="https://github.com/kulaeff/muscle">https://github.com/kulaeff/muscle</a>
                    </span>
                </div>
            </div>
        )
    }
}

export default About