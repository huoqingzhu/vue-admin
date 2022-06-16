import {
    BoxGeometry,
    Mesh,
    MeshLambertMaterial,
    TextureLoader,
    SpriteMaterial,
    Sprite,
    Group,
    Vector2,
    Shape,
    ExtrudeGeometry,
    MeshPhongMaterial,
    DoubleSide,
    SphereGeometry,
    MeshBasicMaterial,
} from 'three'

interface list {
  id: number;
  x: number;

  z: number;
}
// 生成随机色
function randomColor(): string {
    let colorStr: any = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .toUpperCase()
    let str = '#' + '000000'.substring(0, 6 - colorStr) + colorStr
    if (str.length < 7) {
        return randomColor()
    } 
    return str
}
/**
 * 生成随机颜色立方体
 * @param color
 * @returns
 */
const createCube = (color: string = randomColor()): Mesh => {
    let cube: Mesh
    let geometry = new BoxGeometry(0.2, 0.1, 0.1) // 创建一个立方体几何对象Geometry
    let material = new MeshLambertMaterial({
        color,
    })
    cube = new Mesh(geometry, material) // 网格模型对象Mesh
    return cube
}
/**
 *
 * @param url
 * @param color
 * @returns
 */
const getSprite = (
    url = 'person.png',
    color = randomColor(),
): THREE.Sprite => {
    let texture = new TextureLoader().load(url)
    let spriteMaterial = new SpriteMaterial({
        color, // 设置精灵矩形区域颜色
        rotation: 0, // 旋转精灵对象45度，弧度值
        map: texture, // 设置精灵纹理贴图
    })
    // 创建精灵模型对象，不需要几何体geometry参数
    let sprite = new Sprite(spriteMaterial)
    sprite.scale.set(20, 20, 20)
    return sprite
}
const addPerson = (node: Group, value: list, targetMap: Map<list, Sprite>) => {
    const sprite = getSprite()
    sprite.position.set(value.x, 0, value.z)
    // console.log(`当前数组长度:${list.length}`)
    targetMap.set(value, sprite)
    node.add(sprite)
}
/**
 * 生产地图
 * @param json JSON数据
 * @param height 高度
 * @returns Group
 */
const createGeojson = (json: any, height: number): THREE.Group => {
    const group = new Group() // THREE.Group是组
    json.features.forEach((element: any) => {
    // 循环json.features
        let shapeArayy: THREE.Shape[] = [] // 多面数组
        const color = randomColor() // 随机生成16进制颜色
        element.geometry.coordinates.forEach((item: any) => {
            // 循环每一个面
            item.forEach((value: any) => {
                // 循环面的每一个顶点
                let arr = value
                let points: any[] = [] // 面的顶点数据
                // 转化为Vector2构成的顶点数组
                arr.forEach((elem: any) => {
                    points.push(new Vector2(elem[0], elem[1]))
                })
                let shape = new Shape(points)
                shapeArayy.push(shape)
            })
        })
        let geometry = new ExtrudeGeometry( // 拉伸造型
            shapeArayy, // 二维轮廓
            // 拉伸参数
            {
                depth: height, // 拉伸长度
                bevelEnabled: false, // 无倒角
            },
        )
        // geometry.center();//几何体居中
        geometry.scale(5, 5, 5) // 几何体缩放
        let material = new MeshPhongMaterial({
            color,
            side: DoubleSide, // 两面可见
        }) // 材质对象
        const node = new Mesh(geometry, material)
        node.name = element.properties.name
        group.add(node)
    })
    return group
}
/**
 * 生成圆
 * @param size 大小
 * @param color 颜色
 * @returns
 */
const createSphere = (size = 10, color = randomColor()) => {
    const geometry = new SphereGeometry(size, 50, 50)
    const material = new MeshBasicMaterial({ color })
    const sphere = new Mesh(geometry, material)
    return sphere
}
export { createCube, getSprite, addPerson, createGeojson, createSphere }
