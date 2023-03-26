//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
    // require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const iris = require('../../iris.json');
    const irisTesting = require('../../iris-testing.json');
    var lossValue;

    let sepalLength, sepalWidth, petalLength,petalWidth, epochVal, learningRate, arr;

exports.postValues = function (req, res) {
    //console.log(irisTesting)
    console.log("req body "+req.body);
     sepalLength = parseInt(req.body.sepalLength);
     sepalWidth = parseInt(req.body.sepalWidth);
     petalLength = parseInt(req.body.petalLength);
     petalWidth = parseInt(req.body.petalWidth);
     epochVal = parseInt(req.body.epoch);
     learningRate = parseFloat(req.body.learningRate);
    //const arr = [sepalLength, sepalWidth, petalLength, petalWidth];
    console.log("sepallength "+sepalLength);
    console.log("learning rate " + learningRate);
     arr = [{"sepalLength":sepalLength, "sepalWidth":sepalWidth, "petalLength":petalLength, "petalWidth":petalWidth}];
    //const arr = [{"sepalLength":2, "sepalWidth":2, "petalLength":2, "petalWidth":2}];
    console.log(arr);
    res.status(200).send(arr);
}

exports.trainAndPredict = function (req, res) {
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]))
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))
    //console.log(outputData.dataSync())
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepalLength, item.sepalWidth,
        item.petalLength, item.petalWidth,
    ]))
    console.log("testing data " +testingData);
    //console.log(testingData.dataSync())    
    //
    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(learningRate), //learning rate
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,         
            {
                epochs: epochVal,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
            
        )
            
        const results = model.predict(testingData);
        results.print()

        results.array().then(array => {
            var resultForData1 = array[0];           
            var arrayToSent = {row: resultForData1}
            res.status(200).send(arrayToSent);
        })
        //

    } //end of run function
    run()

};
