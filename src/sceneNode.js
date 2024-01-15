/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */

        // Apply the transformations about TRS
        var transformedMvp = MatrixMult(mvp, this.trs.getTransformationMatrix());
        var transformedModelView = MatrixMult(modelView, this.trs.getTransformationMatrix());
        var transformedNormal = MatrixMult(normalMatrix, this.trs.getTransformationMatrix());
        var transformedModel = MatrixMult(modelMatrix, this.trs.getTransformationMatrix());

        // Draw the MeshDrawer if it exists
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormal, transformedModel);
        }

        // Recursively draw children
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormal, transformedModel);
        }
    }




}