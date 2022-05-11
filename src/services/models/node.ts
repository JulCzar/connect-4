export class NodeModel {
  value: number;

  constructor() {
    this.value = 0;
  }
  addToValue(additive: number) {
    this.value += additive;
  }
  get calculatedValue() {
    return Math.tanh(this.value);
  }
}
