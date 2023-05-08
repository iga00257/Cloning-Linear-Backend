
function parseConfig(text) {
  var regex = /(\w+)\s*({([\s\S]*?)})?\s*/g;
  var result = {};
  var match;

  while ((match = regex.exec(text)) !== null) {
    var key = match[1];
    var value = match[3] || match[2];
    if (value !== undefined) {
      if (value[0] === "{") {
        result[key] = parseConfig(value);
      } else {
        var nestedRegex = /(\w+)\s*:\s*(.*?)\s*(\n|$)/g;
        var nestedResult = {};
        var nestedMatch;
        while ((nestedMatch = nestedRegex.exec(value)) !== null) {
          var nestedKey = nestedMatch[1];
          var nestedValue = nestedMatch[2];
          if (!isNaN(nestedValue)) {
            nestedResult[nestedKey] = Number(nestedValue);
          } else if (nestedValue === "True") {
            nestedResult[nestedKey] = true;
          } else if (nestedValue === "False") {
            nestedResult[nestedKey] = false;
          } else {
            nestedResult[nestedKey] = nestedValue;
          }
        }
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        } else {
          var subtext = text.slice(match.index + match[0].length);
          var submatch = /^image_directory_path:\s*(.*?)\s*(\n|\r\n)/gm.exec(subtext);
          if (submatch !== null) {
            result[key] = submatch[1];
          }
        }
      }
    }
  }

  return result;
}
  

  const simpleText = `eval_config {
    eval_dataset_path: "/path/to/your/test/data"
    model_path: "/workspace/tao-experiments/classification/weights/resnet_080.tlt"
    top_k: 3
    batch_size: 256
    n_workers: 8
    enable_center_crop: True
  }`


const text = `kitti_config {
  root_directory_path: "/workspace/tao-experiments/data/"
  image_dir_name: "training/image_2"
  label_dir_name: "training/label_2"
  image_extension: ".png"
  partition_mode: "random"
  num_partitions: 2
  val_split: 0
  num_shards: 10
}
image_directory_path: "/workspace/tao-experiments/data/"
  target_class_mapping {
      key: "car"
      value: "car"
  }
  target_class_mapping {
      key: "pedestrian"
      value: "pedestrian"
  }
  target_class_mapping {
      key: "cyclist"
      value: "cyclist"
  }
  target_class_mapping {
      key: "van"
      value: "car"
  }
  target_class_mapping {
      key: "person_sitting"
      value: "pedestrian"
  }
  target_class_mapping {
      key: "truck"
      value: "car"
}`;

console.log(parseConfig(text));
// console.log(parseConfig(simpleText));
