export default function bytes(value) {
    if (value === 0) return '0'

    const
        denominator = 1024,
        suffixes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
        i = parseInt(Math.floor(Math.log(value) / Math.log(denominator)), 10)

    if (i === 0) {
        return `${value} ${suffixes[i]}`
    } else {
        return `${parseFloat((value / Math.pow(denominator, i)).toFixed(1))} ${suffixes[i]}`
    }
}