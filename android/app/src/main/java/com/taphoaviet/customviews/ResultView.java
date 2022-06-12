package com.taphoaviet.customviews;

import com.taphoaviet.tflite.Classifier;

import java.util.List;

/**
 * Created by Nhien Nguyen on 6/12/2022
 */
public interface ResultsView {
    public void setResults(final List<Classifier.Recognition> results);
}