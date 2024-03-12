import { loadingSize, oversize1, oversize2, oversize3, oversize4, oversize5, oversize6, constructionSize } from './data.js';
import { checkY, checkX } from './validation.js';

export function oversizeForm() {
    const addBtn = document.querySelector('#addBtn');
    const countBtn = document.querySelector('#count');
    const resetBtn = document.querySelector('#reset');
    const pointsField = document.querySelector('#points');
    const resultField = document.querySelector('#result');
    const points = [];
    let indexArr = [0, 0, 0, 0];

    addBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const coordY = parseInt(document.querySelector('#coord-Y').value);
        const coordX = parseInt(document.querySelector('#coord-X').value);

        if (checkY(coordY) && checkX(coordX)) {
            points.push({
                Y: coordY,
                X: coordX,
                zone: "",
                index: ""
            });
        } else {
            alert('error')
        }

        points.forEach((point) => {
            let sizeX

            sizeX = check(point["Y"], loadingSize)
            if (point["X"] <= sizeX) {
                point['index'] = 0
                return
            }

            sizeX = check(point["Y"], oversize1)
            if (point["X"] <= sizeX) {
                point['index'] = 1
                return
            }

            sizeX = check(point["Y"], oversize2)
            if (point["X"] <= sizeX) {
                point['index'] = 2
                return
            }

            sizeX = check(point["Y"], oversize3)
            if (point["X"] <= sizeX) {
                point['index'] = 3
                return
            }

            sizeX = check(point["Y"], oversize4)
            if (point["X"] <= sizeX) {
                point['index'] = 4
                return
            }

            sizeX = check(point["Y"], oversize5)
            if (point["X"] <= sizeX) {
                point['index'] = 5
                return
            }

            sizeX = check(point["Y"], oversize6)
            if (point["X"] <= sizeX) {
                point['index'] = 6
                return
            }

            sizeX = check(point["Y"], constructionSize)
            if (point["X"] <= sizeX) {
                point['index'] = 8
                return
            }

            point['index'] = "S"
        });

        points.forEach((point) => {
            if (point["Y"] >= 480 && point["Y"] < 1400) point["zone"] = "нижняя";
            if (point["Y"] >= 1400 && point["Y"] < 4000) point["zone"] = "боковая";
            if (point["Y"] >= 4000 && point["Y"] <= 5300) point["zone"] = "верхняя";
        })

        points.forEach((point) => {
            if (point["zone"] === "нижняя" && point["index"] > indexArr[0]) {
                indexArr[0] = point["index"];
            }

            if (point["zone"] === "боковая" && point["index"] > indexArr[1]) {
                indexArr[1] = point["index"];
            }

            if (point["zone"] === "верхняя" && point["index"] > indexArr[2]) {
                indexArr[2] = point["index"];
            }
        })
        render(points, pointsField);
        renderIndex(indexArr, resultField)
    });

    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        points.splice(0, points.length)
        render(points, pointsField);

        for (let i = 0; i < indexArr.length; i++) {
            indexArr[i] = 0;
        };
        console.log(indexArr)
        renderIndex(indexArr, resultField);
    });
};

function check(y, array) {
    let interpolation = false, maxX;

    const index = array.findIndex((frame) => {
        if (y === frame[0]) {
            return true
        } else if (y < frame[0]) {
            interpolation = true
            return true
        }
    });

    if (!interpolation) {
        return maxX = array[index][1]
    }
    else if (interpolation) {
        return maxX = Math.floor(array[index - 1][1] + (y - array[index - 1][0]) * (array[index][1] - array[index - 1][1]) / (array[index][0] - array[index - 1][0]));
    }
}

function render(pointsObj, field) {
    field.innerHTML = `
    <div class="oversize-points__row" >
        <div class="oversize-points__item"><b>Y</b></div>
        <div class="oversize-points__item"><b>X</b></div>
        <div class="oversize-points__item"><b>Зона</b></div>
        <div class="oversize-points__item"><b>Степень</b></div>
    </div>`

    pointsObj.forEach((point) => {
        field.insertAdjacentHTML("beforeend", `
            <div class="oversize-points__row">
                <div class="oversize-points__item">${point['Y']}</div>
                <div class="oversize-points__item">${point['X']}</div>
                <div class="oversize-points__item">${point['zone']}</div>
                <div class="oversize-points__item">${point['index']}</div>
            </div>
        `);
    });
};

function renderIndex(indexArray, field) {
    field.innerText = 'Индекс негабаритности: Н' + indexArray[0] + indexArray[1] + indexArray[2] + '0';
};
