import { loadingSize, oversize1, oversize2, oversize3, oversize4, oversize5, oversize6, constructionSize } from './data.js';

export function oversizeForm() {
    const addBtn = document.querySelector('#addBtn');
    const countBtn = document.querySelector('#count');
    const resetBtn = document.querySelector('#reset');
    const pointsField = document.querySelector('#points');
    const resultField = document.querySelector('#result');
    const points = [];
    let indexArr = [0, 0, 0, 0, false];

    addBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let coordY = document.querySelector('#coord-Y').value;
        let coordX = document.querySelector('#coord-X').value;

        if (coordY) coordY = parseInt(coordY);
        if (coordX) coordX = parseInt(coordX);

        if (checkY(coordY) && checkX(coordX)) {
            points.push({
                Y: coordY,
                X: coordX,
                zone: "",
                index: ""
            });

            document.querySelector('#coord-Y').value = "";
            document.querySelector('#coord-X').value = "";

            points.forEach((point) => {
                let data = [loadingSize, oversize1, oversize2, oversize3, oversize4, oversize5, oversize6, constructionSize];
                let prevX, sizeX;

                for (let index = 0; index < data.length; index++) {
                    sizeX = check(point["Y"], data[index])

                    if (index !== 0) {
                        point['minus'] = point["X"] - check(point["Y"], data[index - 1]);
                    };

                    if (point["X"] <= sizeX) {
                        if (index <= 6) {
                            point['index'] = index;
                        } else {
                            point['index'] = 8;
                        };

                        point['plus'] = sizeX - point["X"];

                        if (index !== 0) {
                            point['minus'] = point["X"] - prevX;
                        };

                        return;
                    };

                    point['minus'] = point["X"] - sizeX;
                    prevX = sizeX > 0 ? sizeX : prevX;
                };

                point['index'] = "–";
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
                if (point["index"] === "–") {
                    indexArr[4] = true;
                }
            });

            render(points, pointsField);
            renderIndex(indexArr, resultField)

        } else {
            alert('Ошибка! Введены некорректные данные.')
        }
    });

    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();

        document.querySelector('#coord-Y').value = "";
        document.querySelector('#coord-X').value = "";

        points.splice(0, points.length)
        render(points, pointsField);

        for (let i = 0; i < 4; i++) {
            indexArr[i] = 0;
        };

        indexArr[4] = false;

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
                <div class="oversize-points__item">
                    ${point['X']}
                    <div class="oversize-points__notice oversize-points__notice--left">
                        ${point['minus'] ? '-' + point['minus'] : ""}
                        ${point['minus'] === 0 ? '-0' : ""}
                    </div>
                    <div class="oversize-points__notice oversize-points__notice--right">
                        ${point['plus'] ? '+' + point['plus'] : ""}
                        ${point['plus'] === 0 ? '+0' : ""}

                    </div>
                </div>
                <div class="oversize-points__item">${point['zone']}</div>
                <div class="oversize-points__item">${point['index']}</div>
            </div>
        `);
    });
};

function renderIndex(indexArray, field) {
    if (indexArray[4]) {
        field.innerText = 'Размеры груза превышают размеры габарита приближения строений.';
    } else {
        field.innerText = 'Индекс негабаритности: Н' + indexArray[0] + indexArray[1] + indexArray[2] + '0';
    };
};

function checkY(y) {
    if (y < 480 || y > 5300) return false
    return true;
}

function checkX(x) {
    if (x < 1 || x > 3000) return false
    return true;
}