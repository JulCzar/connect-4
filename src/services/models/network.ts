import { inputCount, outputCount } from '../../config/constants';
import { NodeModel } from './node';

type Nullable<T> = T | null;

export class Network {
  middleSizes: number[];
  depth: number;
  weights: number[];
  nodes: NodeModel[];
  weightCount: number;

  constructor(
    middleSize: Nullable<number[]>,
    parentNetworks: Nullable<Network[]>
  ) {
    this.middleSizes = middleSize ?? [];
    if (parentNetworks !== null)
      this.middleSizes = parentNetworks[0].middleSizes;

    this.depth = this.middleSizes.length;
    this.weights = [];
    this.nodes = [];
    let nodeCount = 0;
    for (let i = 0; i < this.middleSizes.length; i++)
      nodeCount += this.middleSizes[i];

    for (let i = 0; i < nodeCount; i++) this.nodes.push(new NodeModel());

    const lastIndex = this.middleSizes.length - 1;

    const firstLayer = this.middleSizes[0];
    const lastLayer = this.middleSizes[lastIndex];
    const weightCount = firstLayer * lastLayer;

    this.weightCount = weightCount;

    if (this.middleSizes.length > 1)
      for (let i = 1; i < this.middleSizes.length; i++)
        this.weightCount += this.middleSizes[i] * this.middleSizes[i - 1];

    if (parentNetworks === null) {
      for (let i = 0; i < this.weightCount; i++) {
        this.weights.push(Math.random() * 2 - 1);
      }
    } else {
      this.mate(parentNetworks);
    }
  }
  mate(nets: Network[]) {
    const c1 = Math.floor(Math.random() * nets.length);
    const p1 = nets[c1];
    let c2 = Math.floor(Math.random() * nets.length);
    while (true) {
      if (c2 !== c1) break;

      c2 = Math.floor(Math.random() * nets.length);
    }
    const p2 = nets[c2];
    if (this.weightCount !== p1.weightCount)
      console.warn('Weight counts do not match.');

    for (let i = 0; i < this.weightCount; i++) {
      if (Math.random() < 0.5) this.weights.push(p1.weights[i]);
      else this.weights.push(p2.weights[i]);

      if (Math.random() < 0.01)
        if (Math.random() < 0.5)
          this.weights[this.weights.length - 1] *= Math.random() * 2;
        else this.weights[this.weights.length - 1] *= Math.random() * 4 - 1;
    }
  }
  runThrough(inputs: number[]) {
    if (inputs.length !== inputCount) {
      console.error('Inputs does not equal input count!');
      return null;
    }
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].value = 0;
    }
    let nextNodeToEdit = 0;
    let nextWeight = 0;
    for (let i = 0; i < inputs.length; i++) {
      nextNodeToEdit = 0;
      for (let j = 0; j < this.middleSizes[0]; j++) {
        this.nodes[nextNodeToEdit].addToValue(
          inputs[i] * this.weights[nextWeight]
        );
        nextWeight++;
        nextNodeToEdit++;
      }
    }
    if (this.middleSizes.length > 1) {
      for (let n = 1; n < this.middleSizes.length; n++) {
        let rememberedNode = nextNodeToEdit;
        for (let i = 0; i < this.middleSizes[n - 1]; i++) {
          nextNodeToEdit = rememberedNode;
          for (let j = 0; j < this.middleSizes[n]; j++) {
            this.nodes[nextNodeToEdit].addToValue(
              this.nodes[nextNodeToEdit - this.middleSizes[n - 1]]
                .calculatedValue * this.weights[nextWeight]
            );
            nextNodeToEdit++;
            nextWeight++;
          }
        }
      }
    }
    if (this.nodes[this.nodes.length - 1].value === 0) {
      console.error('Not all nodes have been reached, there is a problem');
    }
    let finalArray = [];

    for (let i = 0; i < outputCount; i++) {
      let toPut = 0;
      for (let j = 0; j < this.middleSizes[this.middleSizes.length - 1]; j++) {
        toPut +=
          this.nodes[
            nextNodeToEdit - this.middleSizes[this.middleSizes.length - 1] + j
          ].calculatedValue * this.weights[nextWeight];
        nextWeight++;
      }
      finalArray.push(toPut);
    }
    return finalArray;
  }
}
