export default function buildData(data){
    const array = () => {
        let result = ''
    
        for (const key in data) {
            result += `${key}=${data[key]}&`
        }
        return result
    }
    return array()
}