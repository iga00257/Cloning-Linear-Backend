import * as protobuf from 'protobufjs';

export function parseProtobufText(text: string): any {
  const root = protobuf.Root.fromJSON(require('./kitti_config.json'));
  const KittiConfig = root.lookupType('kitti_config.KittiConfig');

  const buffer = Buffer.from(text, 'utf8');
  const decoded = KittiConfig.decode(buffer);

  return KittiConfig.toObject(decoded, {
    longs: String,
    enums: String,
    bytes: String,
  }) as any;
}

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

const kittiConfig = parseProtobufText(text);
console.log(kittiConfig);