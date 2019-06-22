const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
    plugins: {
        "postcss-preset-env": {
            stage: 0,
            features: {
                "nesting-rules": true
            }
        },
        'postcss-sorting': {
            'order': [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom'
        }
    },
    
}