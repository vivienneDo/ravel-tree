// Author:   Frank Fusco (fr@nkfus.co)
// Created:  03/19/18
// Modified: 03/19/18

// Ravel-related functions for RavelTree.

export function getRavel (id) {
  const path = './test/' + id;
  return (require (path));
}
