import React from 'react'
import cn from 'cn-decorator';
import './style.less';

/**
 * About container
 * @class
 */
@cn('about')
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
    render(cn) {
        return (
            <div className={cn()}>
                <div className={cn('content')}>
                    <span className={cn('title')}>Muscle</span>
                    <span className={cn('description')}>An awesome MySQL manager</span>
                    <span className={cn('version')}>
                        Version: {process.env.VERSION || 0}
                    </span>
                    <span className={cn('url')}>
                        <a href="https://github.com/kulaeff/muscle">https://github.com/kulaeff/muscle</a>
                    </span>
                </div>
            </div>
        )
    }
}

export default About