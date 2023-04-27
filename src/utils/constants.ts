export const _apiHost = 'https://sampleserver6.arcgisonline.com/arcgis';
export const _endPoints = {
  GET_SERVICES_LIST: '/rest/services?f=pjson',
  GET_SERVICES_DETAILS: `/rest/services/${'serviceName'}/ImageServer?f=pjson`,
  GET_SERVICES_IMAGE: `/rest/services/${'serviceName'}/ImageServer/exportImage?bbox=${'extent'}&bboxSR=&size=400,400&format=jpgpng&pixelType=UNKNOWN&f=pjson`,
};
