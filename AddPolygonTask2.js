const Polygon = {
    tops: [],//массив вершин многоугольника,
    isLastTop: function(index) {
        return index === this.tops.length - 1
    },
    getPerimeter: function() {// функция для получения периметра
        let perimeter = 0// начальное значение для нашего периметра

        for (let i = 0; i < this.tops.length; i++) {// цикл идет по всем нашим вершинам
            // get current and next top
            const currentTop = this.tops[i]//вычисляем текущую вершину
            const nextTop = this.isLastTop(i) ? this.tops[0] : this.tops[i + 1]//вычисляем следущую вершину, если дошли до конца массва, т.е. индекс последней вершины равен последнему i, тогда берем первую вершину

            // get vector coordinates (x, y): A(x1, y1), B(x2, y2) => AB = (x2 - x1, y2 - y1)
            const vector = {
                x: nextTop.x - currentTop.x,
                y: nextTop.y - currentTop.y
            }

            // get vector module (scalar): AB(x, y) => sqrt(x ^ 2 + y ^ 2)
            const vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))//вычисляем длину вектора
            // add vector module to perimeter
            perimeter += vectorLength//считаем периметр фигуры
        }

        return perimeter
    },
    getSquare: function() {
        let sumX = 0
        let sumY = 0

        for (let i = 0; i < this.tops.length; i++) {//идем по всем вершинам
            // get current and next top
            const currentTop = this.tops[i]//currentTop - текущая вершина, this.tops[i] - массив вершин у текущего многоугольника
            const nextTop = this.isLastTop(i) ? this.tops[0] : this.tops[i + 1]//индексы вершин, если индекс последней  вершины равен последнему i в итерации, то присваиваем значение первой вершине, а иначе берем следущую вершину 

            // multiply matching coordinates
            sumX += currentTop.x * nextTop.y// sumX берем х - у тукущей вершины и умножаем на Y следующей вершины 
            sumY += currentTop.y * nextTop.x// sumY берем Y - у тукущей вершины и умножаем на X у  следующей вершины 
        }

        return Math.abs(sumX - sumY) / 2// сначала отнимаем, потом модуль, а потом делим
    },
    draw: function() {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        for (let i = 0; i < this.tops.length; i++) {
            const currentTop = this.tops[i]
            const nextTop = this.isLastTop(i) ? this.tops[0] : this.tops[i + 1]// если вершины закончились, то берем самую первую вершину, а если нет то берем следующую в массиве

            const multiplier = 30

            const currentX = currentTop.x * multiplier
            const currentY = currentTop.y * multiplier

            const nextX = nextTop.x * multiplier
            const nextY = nextTop.y * multiplier

            ctx.beginPath()

            const px = 5// на 5 пикселей выше и на 5 пикселей правее
            ctx.moveTo(currentX, currentY)// двигаемся на позицию текущей точки
            ctx.fillText(`P${i + 1} (${currentTop.x}, ${currentTop.y})`, currentX + px, currentY - px)//$ когда хотим вставить значение переменной пряму в строку, пишем координаты нашей точки, пишем координаты нашего текста
            ctx.lineTo(nextX, nextY)// проводим линию до следующей координаты
            ctx.stroke()

            ctx.closePath()
        }
    }
}

const amountOfTops = prompt('Введите кол-во вершин многоугольника:')
let counter = 0

while (counter < amountOfTops) {
    const pairOfTopsStr = prompt('Введите x, y:')
    const pairOfTops = pairOfTopsStr.split(',')//создаем массив, все что до запятой это нулевой элемент массива, а после запятой это первый элемент массива
    Polygon.tops.push({//кладем объет в наш массив вершин  tops
        x: pairOfTops[0].trim(),// убераем пробелы
        y: pairOfTops[1].trim()
    })

    counter++
}

console.log(Polygon.tops)
document.getElementById('perimeter').innerHTML = Polygon.getPerimeter()
document.getElementById('square').innerHTML = Polygon.getSquare()
Polygon.draw()
